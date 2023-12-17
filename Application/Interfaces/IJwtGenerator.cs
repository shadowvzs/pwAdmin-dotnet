namespace Application.Interfaces
{
    public interface IJwtGenerator 
    {
        string CreateToken(string payload);
    }
}