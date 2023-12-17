namespace Application.dto
{
    public enum InstanceTypeEnum
    {
        App,
        Map
    }

    public class Instance
    {
        public string Id { get; set; }
        public string AppName { get; set; }
        public string Name { get; set; }
        public string Command { get; set; }
        public string CommandSuffix { get; set; }
        public InstanceTypeEnum Type { get; set; }
        public bool IsRunning { get; set; }
    }
}