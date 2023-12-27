using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;

namespace Infrastructure.Swagger
{
	public class AddHeader : IOperationFilter
	{
		public void Apply(OpenApiOperation operation, OperationFilterContext context)
		{
			operation.Parameters ??= new List<OpenApiParameter>();

			operation.Parameters.Add(new OpenApiParameter()
			{
				Name = "Authorization",
				In = ParameterLocation.Header,
				Required = true,
				Schema = new OpenApiSchema
				{
					Type = "String"
				}
			});
		}
	}
}
