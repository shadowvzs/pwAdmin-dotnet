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
    public class CheckInstancesStatus
    {
        public class CheckInstancesStatusQuery : IRequest<List<ServerInstanceStatusDto>>
        {
            public List<string> Instances { get; set; } = null;
        }

        public class Handler : IRequestHandler<CheckInstancesStatusQuery, List<ServerInstanceStatusDto>>
        {
            private List<string> result = new List<string>();
 
            public async Task<List<ServerInstanceStatusDto>> Handle(CheckInstancesStatusQuery request, CancellationToken cancellationToken)
            {
                Process process = new Process();
                process.StartInfo.WorkingDirectory = InstanceList.ServerRoot;
                process.StartInfo.FileName = "/bin/bash";
                process.StartInfo.Arguments = "ps -A w";
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;
                process.OutputDataReceived += (s, e) => result.Add(e.Data); // new DataReceivedEventHandler(OutputHandler);
                process.Start();
                process.BeginOutputReadLine();
                process.BeginErrorReadLine();
                process.WaitForExit();

                var list = new List<ServerInstanceStatusDto>();
                InstanceList.list.ForEach(instance =>
                {
                    list.Add(new ServerInstanceStatusDto
                    {
                        Id = instance.Id,
                        Name = instance.Name,
                        Type = instance.Type,
                        IsRunning = result.Any(outputLine => outputLine.Contains(instance.Command, StringComparison.OrdinalIgnoreCase))
                    });
                });

                await Task.Delay(1);

                return list;
            }


        }
    }
}