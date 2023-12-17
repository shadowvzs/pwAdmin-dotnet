using Application.dto;

using System.Collections.Generic;

namespace Application.Servers
{
   public class InstanceList
    {
        public static readonly string ServerRoot = "/root";
        public static readonly List<Instance> list;
        public static readonly List<string> maps = new List<string> { "gs01","is01","is02","is05","is06","is07","is08","is09","is10","is11","is12","a12b","is13","is14","is15","is16","is17","is18","is19","is20","is21","is22","is23","is24","is25","is26","a26b","is27","is28","is29","a29b","is31","is32","is33","is34","arena04","arena01","arena02","arena03","bg01","bg02","bg03","bg04","bg05","bg06"};
 
        static InstanceList()
        {
            //  /root/logservice/logservice /root/logservice/logservice.conf >/root/logs/logservice11.log &
            list = new List<Instance>
            {
                new Instance
                {
                    Id = "logservices",
                    AppName = "logservices",
                    Name = "Log Service",
                    Command = "./logservice/logservice ./logservice/logservice.conf",
                    CommandSuffix = " >./logs/logservice.log &",
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "uniquenamed",
                    AppName = "uniquenamed",
                    Name = "Unique Name",
                    Command = "./uniquenamed/uniquenamed ./uniquenamed/gamesys.conf",
                    CommandSuffix = " ./logs/uniquenamed.log &",
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "authd",
                    AppName = "authd",
                    Name = "Auth",
                    Command = "./authd/build/authd",
                    CommandSuffix = " &",
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "gamedbd",
                    AppName = "gamedbd",
                    Name = "Game DB",
                    Command = "./gamedbd/gamedbd ./gamedbd/gamesys.conf",
                    CommandSuffix = " >./logs/gamedbd.log &",
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "gacd",
                    AppName = "gacd",
                    Name = "Gacd",
                    Command = "./gacd/gacd ./gacd/gamesys.conf",
                    CommandSuffix = " >./logs/gacd.log &",
                    Type = InstanceTypeEnum.App,
                },
                new Instance
                {
                    Id = "gfactiond",
                    AppName = "gfactiond",
                    Name = "GFaction",
                    Command = "./gfactiond/gfactiond ./gfactiond/gamesys.conf",
                    CommandSuffix = " >./logs/gfactiond.log &",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "gdeliveryd",
                    AppName = "gdeliveryd",
                    Name = "Game Delivery",
                    Command = "./gdeliveryd/gdeliveryd ./gdeliveryd/gamesys.conf",
                    CommandSuffix = " >./logs/gdeliveryd.log &",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink1",
                    AppName = "glinkd",
                    Name = "Game Link 1",
                    Command = "./glinkd/glinkd ./glinkd/gamesys.conf 1",
                    CommandSuffix = " >./logs/glinkd1.log &",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink2",
                    AppName = "glinkd",
                    Name = "Game Link 2",
                    Command = "./glinkd/glinkd ./glinkd/gamesys.conf 2",
                    CommandSuffix = " >./logs/glinkd2.log &",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink3",
                    AppName = "glinkd",
                    Name = "Game Link 3",
                    Command = "./glinkd/glinkd ./glinkd/gamesys.conf 3",
                    CommandSuffix = " >./logs/glinkd3.log &",
                    Type = InstanceTypeEnum.App,
                },
               new Instance
                {
                    Id = "glink4",
                    AppName = "glinkd",
                    Name = "Game Link 4",
                    Command = "./glinkd/glinkd ./glinkd/gamesys.conf 4",
                    CommandSuffix = " >./logs/glinkd4.log &",
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
                    Command = "./gamed/gs " + mapId,
                    CommandSuffix = " >./logs/"+mapId+".log &",
                    Type = InstanceTypeEnum.Map,
                });
            });
        }
    }
}