using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Linq;

namespace Infrastructure.Swagger
{
	public class NullableSchemaFilter : ISchemaFilter
	{
		public void Apply(OpenApiSchema schema, SchemaFilterContext context)
		{
			schema.Nullable = IsNullable(context.Type);
			if (schema.Properties.Any())
			{
				var missingRequiredProperties = schema.Properties.Where(e => !schema.Required.Contains(e.Key));
				foreach (var missingRequiredProperty in missingRequiredProperties)
				{
					schema.Required.Add(missingRequiredProperty.Key);
				}
			}
		}

		private static bool IsNullable(Type value)
		{
			return Nullable.GetUnderlyingType(value) != null;
		}
	}
}
