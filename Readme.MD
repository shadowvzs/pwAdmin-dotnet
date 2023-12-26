# Perfect World Admin Panel

Specs: 
- Backend with .Net8, MySQL connector, swagger (for typegeneration)
- Frontend RewactJS 18, TypeScript, Swagger, MobX, Tailwinds (maybe lingui later)


## Backend/Frontend types
Note: Swagger and type sharing, backend type generated for frontend in typescript form
- when you start the backend the *\WebApi\Client\src\api\swagger-pwadmin.json* created based on current controller and it's request and response dto
    - postbuild command is inside the *WebApi.csproj*
- frontend will generate types based on *swagger-pwadmin.json* into */WebApi/Client/src/types/api/models/* with *openapi-typescript-codegen* package


## Development
### Backend
- dotnet restore/build from parrent folder and maybe need to install a package ```dotnet tool install -g Swashbuckle.AspNetCore.Cli --version 6.5.0```
- [optional] you can use secrets if you want with: ```dotnet user-secrets set "TokenKey" "arandomserversidetokenforsomething" -p WebApi/```
- Connection string or token was stored here: *\WebApi\appsettings.json*
- start backend from the project root folder:
```dotnet run --project WebApi```

- Default Api url is http://localhost:5000/api/controllername/actionName
    - ex.: http://localhost:5000/api/users/login

- Swagger url: http://localhost:5000/swagger

### Frontend
- The frontend work with webpack/typescript and have some eslint rule, so prefered to install eslint extension for VisualStudio Code :)
- start frontend from the *Client* folder
```npm start```
- generate type without start the project
```npm run type-generator```

- frontend default url (maybe will be changed by time): http://localhost:8080/


## Deployment
### Frontend
- in the **/WebApi/Client** run the ```npm run build```
    - this will prepare the bundle.js and inject the css into the final html in **/WebApi/wwwroot**