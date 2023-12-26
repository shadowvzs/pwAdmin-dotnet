using Application.dto;

using System.Collections.Generic;

namespace Application.Servers
{
   public class InstanceList
    {
        public static readonly List<Instance> list;
        public static readonly List<string> maps = new List<string> { "gs01","is01","is02","is05","is06","is07","is08","is09","is10","is11","is12","a12b","is13","is14","is15","is16","is17","is18","is19","is20","is21","is22","is23","is24","is25","is26","a26b","is27","is28","is29","a29b","is31","is32","is33","is34","arena04","arena01","arena02","arena03","bg01","bg02","bg03","bg04","bg05","bg06"};
 
        static InstanceList()
        {
            //  /root/logservice/logservice /root/logservice/logservice.conf >/root/logs/logservice11.log &
            list = new List<Instance>
            {
                new Instance
                {
                    Id = "logservice",
                    AppName = "logservice",
                    Name = "Log Service",
                    FolderName = "logservice",
                    Arguments = "logservice.conf",
                    Log = true,
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "uniquenamed",
                    AppName = "uniquenamed",
                    Name = "Unique Name",
                    FolderName = "uniquenamed",
                    Arguments = "gamesys.conf",
                    Log = true,
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "authd",
                    AppName = "authd",
                    Name = "Auth",
                    FolderName = "authd/build",
                    Log = false,
                    Arguments = "",
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "gamedbd",
                    AppName = "gamedbd",
                    Name = "Game DB",
                    FolderName = "gamedbd",
                    Arguments = "gamesys.conf",
                    Log = true,
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "gacd",
                    AppName = "gacd",
                    Name = "Gacd",
                    FolderName = "gacd",
                    Arguments = "gamesys.conf",
                    Log = true,
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "gfactiond",
                    AppName = "gfactiond",
                    Name = "GFaction",
                    FolderName = "gfactiond",
                    Arguments = "gamesys.conf",
                    Log = true,
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "gdeliveryd",
                    AppName = "gdeliveryd",
                    Name = "Game Delivery",
                    FolderName = "gdeliveryd",
                    Arguments = "gamesys.conf",
                    Log = true,
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink1",
                    AppName = "glinkd",
                    Name = "Game Link 1",
                    FolderName = "glinkd",
                    Log = true,
                    Arguments = "gamesys.conf 1",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink2",
                    AppName = "glinkd",
                    Name = "Game Link 2",
                    Arguments = "gamesys.conf 2",
                    Log = true,
                    FolderName = "glinkd",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink3",
                    AppName = "glinkd",
                    Name = "Game Link 3",
                    Arguments = "gamesys.conf 3",
                    Log = true,
                    FolderName = "glinkd",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink4",
                    AppName = "glinkd",
                    Name = "Game Link 4",
                    Arguments = "gamesys.conf 4",
                    Log = true,
                    FolderName = "glinkd",
                    Type = InstanceTypeEnum.App,
                },
            };

            maps.ForEach(mapId =>
            {
                list.Add(new Instance
                {
                    Id = mapId,
                    AppName = "gs",
                    Name = Maps.mapNames[mapId],
                    Arguments = mapId,
                    FolderName = "gamed",
                    Log = true,
                    Type = InstanceTypeEnum.Map,
                });
            });
        }
    }
}