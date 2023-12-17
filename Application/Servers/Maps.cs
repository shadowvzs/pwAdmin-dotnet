using Model;
using System.Collections.Generic;

namespace Application.Servers
{
    public class Maps
    {
        public static readonly List<Map> list = new List<Map>(){
            new Map() { Id = "gs01", Name = "World", Version = 0 },
            new Map() { Id = "is01", Name = "Netherbeast City", Version = 0 },
            new Map() { Id = "is02", Name = "Heroes Tomb", Version = 0 },
            new Map() { Id = "is05", Name = "Cave of Fire", Version = 0 },
            new Map() { Id = "is06", Name = "Wolf Den", Version = 0 },
            new Map() { Id = "is07", Name = "Scorpion Cave", Version = 0 },
            new Map() { Id = "is08", Name = "Green Shirt Tomb", Version = 0 },
            new Map() { Id = "is09", Name = "Haunted Grotto", Version = 0 },
            new Map() { Id = "is10", Name = "Frozen Realm", Version = 0 },
            new Map() { Id = "is11", Name = "Valley of Disaster", Version = 0 },
            new Map() { Id = "is12", Name = "Forest Ruins", Version = 0 },
            new Map() { Id = "a12b", Name = "New Forest Ruins (a12b)", Version = 0 },
            new Map() { Id = "is13", Name = "Realm of Ghost", Version = 0 },
            new Map() { Id = "is14", Name = "Gate of Wright", Version = 0 },
            new Map() { Id = "is15", Name = "Cave of Treasures", Version = 0 },
            new Map() { Id = "is16", Name = "Heavenly Illusion", Version = 0 },
            new Map() { Id = "is17", Name = "Devil's Illusion", Version = 0 },
            new Map() { Id = "is18", Name = "Dragon Palace", Version = 0 },
            new Map() { Id = "is19", Name = "Weeping Isle", Version = 0 },
            new Map() { Id = "is20", Name = "Snakes Island", Version = 0 },
            new Map() { Id = "is21", Name = "Celestial World", Version = 0 },
            new Map() { Id = "is22", Name = "Demon World", Version = 0 },
            new Map() { Id = "is23", Name = "Purgatory of Heaven", Version = 0 },
            new Map() { Id = "is24", Name = "Devil's Arcadia", Version = 0 },
            new Map() { Id = "is25", Name = "Misty City", Version = 0 },
            new Map() { Id = "is26", Name = "Residence of Basphemy", Version = 0 },
            new Map() { Id = "a26b", Name = "Palace of Nirvana (a26b)", Version = 0 },
            new Map() { Id = "is27", Name = "Crescent Valley", Version = 0 },
            new Map() { Id = "is28", Name = "Godless Valley", Version = 0 },
            new Map() { Id = "is29", Name = "Ultimate Destination", Version = 0 },
            new Map() { Id = "a29b", Name = "New Frostcovered City (a29b)", Version = 0 },
            new Map() { Id = "is31", Name = "Holy Hall of Dusk", Version = 0 },
            new Map() { Id = "is32", Name = "Beehive Adytum", Version = 0 },
            new Map() { Id = "is33", Name = "Chrono City", Version = 0 },
            new Map() { Id = "is34", Name = "Perfect Chapel", Version = 0 },
            new Map() { Id = "arena04", Name = "ADC Arena", Version = 0 },
            new Map() { Id = "arena01", Name = "Ethersword Arena", Version = 0 },
            new Map() { Id = "arena02", Name = "Lost City Arena", Version = 0 },
            new Map() { Id = "arena03", Name = "Plume City Arena", Version = 0 },
            new Map() { Id = "bg01", Name = "Territory War T-3 PvP", Version = 0 },
            new Map() { Id = "bg02", Name = "Territory War T-3 PvE", Version = 0 },
            new Map() { Id = "bg03", Name = "Territory War T-2 PvP", Version = 0 },
            new Map() { Id = "bg04", Name = "Territory War T-2 PvE", Version = 0 },
            new Map() { Id = "bg05", Name = "Territory War T-1 PvP", Version = 0 },
            new Map() { Id = "bg06", Name = "Territory War T-1 PvE", Version = 0 }
        };

        public static readonly Dictionary<string, string> mapNames = new Dictionary<string, string>();

        static Maps()
        {
            list.ForEach(map =>
            {
                mapNames.Add(map.Id, map.Name);
            });
        }

        public static List<Map> GetMaps(int version = 0)
        {
            return list.FindAll(map => map.Version >= version);        
        }
    }
}