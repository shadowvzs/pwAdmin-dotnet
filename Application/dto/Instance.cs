namespace Application.dto
{

    public enum InstanceTypeEnum
    {
        App,
        Map
    }

    public class Instance
    {
        public static readonly string ServerRoot = "/root";
        public static readonly string LogFolder = "/root/logs";
        public string Id { get; set; }
        public string AppName { get; set; }
        public string Name { get; set; }
        public string Arguments { get; set; }
        public string FolderName { get; set; }
        public string FolderPath {
            get {
                return Instance.ServerRoot + "/" + FolderName;
            }
        }
        public string LogFileName {
            get {
                return Instance.LogFolder + "/" + this.Id + ".log";
            }
        }

        public string Command { get {
                return AppName + " " + Arguments;
            }
        }
        public InstanceTypeEnum Type { get; set; }
        public bool Log { get; set; }
        public bool IsRunning { get; set; }
    }
}