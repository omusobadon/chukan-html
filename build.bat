@echo off
pnpm install

set "sourceFile=./node_modules/@astrojs/starlight/components/SidebarSublist.astro"
set "sourceFile2=./node_modules\astro-relative-links\dist\index.js"

set "replaceString=href=`${entry.href}index.html`"
set "replaceString2={dir.pathname}"

if not exist "%sourceFile%" (
    echo Source file not found: %sourceFile%
    goto :eof
)


if not exist "%sourceFile2%" (
    echo Source file not found: %sourceFile2%
    goto :eof
)


PowerShell -Command "(Get-Content '%sourceFile%') -replace 'href={entry.href}', '%replaceString%' | Set-Content '%sourceFile%'"

pnpm i astro-relative-links

pnpm up

PowerShell -Command "(Get-Content '%sourceFile2%') -replace '{outDirPath}', '%replaceString2%' | Set-Content '%sourceFile2%'"

pnpm build

cd .hugo

hugo
