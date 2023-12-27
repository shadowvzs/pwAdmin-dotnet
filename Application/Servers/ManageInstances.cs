using MediatR;
using Application.dto;

using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Diagnostics;
using System;
using System.Linq;

namespace Application.Servers
{
    public enum InstanceActionEnum
    {
        STOP = 0,
        START = 1
    }

    public class ManageInstances
    {
        public class ManageInstancesCommand : IRequest<Unit>
        {
            public List<string> Instances { get; set; }
            public InstanceActionEnum Action { get; set; }
        }

        public class Handler : IRequestHandler<ManageInstancesCommand, Unit>
        {
            private List<string> result = new List<string>();

            public async Task<Unit> Handle(ManageInstancesCommand request, CancellationToken cancellationToken)
            {
                var instances = request.Instances;
                if (instances == null || instances.Count == 0)
                {
                    instances = InstanceList.list.Select(inst => inst.Id).ToList<string>();
                }
                for (var i = instances.Count - 1; i >= 0; i--)
                {
                    ManageInstance(instances[i], request.Action);
                    await Task.Delay(1000);
                }

                return Unit.Value;
            }

            public void ManageInstance(string id, InstanceActionEnum action)
            {
                var instance = InstanceList.list.FirstOrDefault(x => x.Id == id);
                if (instance == null)
                {
                    throw new Exception("The provided instance not exist!");
                }

                Process process = new Process();
                if (action == InstanceActionEnum.START)
                {
                    process.StartInfo.WorkingDirectory = instance.FolderPath;
                    process.StartInfo.FileName = instance.AppName;
                    string arguments = instance.Arguments;
                    if (instance.Log)
                    {
                        // arguments = arguments + " >" + instance.LogFileName;
                    }
                    process.StartInfo.Arguments = arguments + " &";
                }
                else
                {
                    if (instance.Type == InstanceTypeEnum.Map)
                    {
                        process.StartInfo.FileName = "/bin/pkill";
                        process.StartInfo.Arguments = "-f " + instance.Id;
                    }
                    else
                    {
                        process.StartInfo.FileName = "/bin/pkill";
                        process.StartInfo.Arguments = "-f " + instance.AppName;
                    }
                }

                process.StartInfo.UseShellExecute = true;
                process.Start();
                process.WaitForExit();
            }
        }
    }
}