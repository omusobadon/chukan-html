@echo off
pnpm install

set "sourceFile=./node_modules/@astrojs/starlight/components/SidebarSublist.astro"
set "replaceString=href=`${entry.href}index.html`"

if not exist "%sourceFile%" (
    echo Source file not found: %sourceFile%
    goto :eof
)

PowerShell -Command "(Get-Content '%sourceFile%') -replace 'href={entry\.href}', '%replaceString%' | Set-Content '%sourceFile%'"

pnpm build

cd .hugo

hugo
