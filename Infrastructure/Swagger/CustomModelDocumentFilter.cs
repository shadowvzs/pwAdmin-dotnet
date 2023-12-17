using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Infrastructure.Swagger
{
	public class CustomModelDocumentFilter<T> : Swashbuckle.AspNetCore.SwaggerGen.IDocumentFilter where T : class
	{
		public void Apply(OpenApiDocument openapiDoc, DocumentFilterContext context)
		{
			context.SchemaGenerator.GenerateSchema(typeof(T), context.SchemaRepository);
		}
	}
}
