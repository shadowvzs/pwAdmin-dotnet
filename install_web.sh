#!/bin/bash
# ------------------ Config -------------------------
websitePath=/var/www/html
# those configs coming from outside, from the server installer
#dbHost="your db host, useually localhost"
#dbUser="sql user"
#dbPassword="sql user password"
#dbName="db name, usually pw"
#pwAdminId="pw admin user id"
#pwAdminSalt="pw admin salt"

wget -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | tee /etc/apt/keyrings/microsoft.gpg
cat > /etc/apt/sources.list.d/microsoft.sources << EOF
Types: deb
URIs: https://packages.microsoft.com/ubuntu/22.04/prod/
Suites: jammy
Components: main
Architectures: amd64
Signed-By: /etc/apt/keyrings/microsoft.gpg
EOF
apt update
apt install -y dotnet-sdk-8.0

apt install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
apt-get update 
apt-get install nodejs -y

wget http://github.com/shadowvzs/pwAdmin-dotnet/archive/master.tar.gz
tar -xzf ./master.tar.gz -C $websitePath
dotnetWebPath="$websitePath/pwAdmin-dotnet-main"
cd $dotnetWebPath
dotnet tool install Swashbuckle.AspNetCore.Cli --version 6.5.0
dotnet tool restore
mkdir ./WebApi/wwwroot
cd ./WebApi/Client
npm i
npm run build
cd $dotnetWebPath
export DOTNET_ROLL_FORWARD=LatestMajor
dotnet build
dotnet run --project WebApi