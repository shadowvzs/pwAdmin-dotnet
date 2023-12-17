namespace Application.dto
{
    public class ServerInstanceStatusDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public InstanceTypeEnum Type { get; set; }
        public bool IsRunning { get; set; }
    }
}