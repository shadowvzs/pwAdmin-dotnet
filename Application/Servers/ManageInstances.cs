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
        STOP,
        START
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
                    process.StartInfo.WorkingDirectory = InstanceList.ServerRoot;
                    process.StartInfo.FileName = "/bin/bash";
                    process.StartInfo.Arguments = instance.Command + instance.Command;
                }
                else
                {
                    if (instance.Type == InstanceTypeEnum.Map)
                    {
                        process.StartInfo.WorkingDirectory = InstanceList.ServerRoot;
                        process.StartInfo.FileName = "/bin/bash";
                        process.StartInfo.Arguments = "kill " + instance.Id;
                    }
                    else
                    {
                        process.StartInfo.WorkingDirectory = InstanceList.ServerRoot;
                        process.StartInfo.FileName = "/bin/bash";
                        process.StartInfo.Arguments = "pkill - 9 " + instance.AppName;
                    }
                }

                process.StartInfo.UseShellExecute = false;
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();
            }
        }
    }
}