@echo off
pnpm install

set "sourceFile=./node_modules/@astrojs/starlight/components/SidebarSublist.astro"
set "sourceFile2=./node_modules\astro-relative-links\dist\index.js"
set "sourceFile3=./node_modules\@astrojs\starlight\components\Pagination.astro"

set "replaceString=href=`${entry.href}index.html`"
set "replaceString2={dir.pathname}"
set "prev=href=`${prev.href}index.html`"
set "next=href=`${next.href}index.html`"

if not exist "%sourceFile%" (
    echo Source file not found: %sourceFile%
    goto :eof
)


if not exist "%sourceFile2%" (
    echo Source file not found: %sourceFile2%
    goto :eof
)


PowerShell -Command "(Get-Content '%sourceFile%') -replace 'href={entry.href}', '%replaceString%' | Set-Content '%sourceFile%'"

PowerShell -Command "(Get-Content '%sourceFile3%') -replace 'href={prev.href}', '%prev%' | Set-Content '%sourceFile3%'"
PowerShell -Command "(Get-Content '%sourceFile3%') -replace 'href={next.href}', '%replaceString%' | Set-Content '%sourceFile3%'"

pnpm i astro-relative-links

pnpm up

PowerShell -Command "(Get-Content '%sourceFile2%') -replace '{outDirPath}', '%replaceString2%' | Set-Content '%sourceFile2%'"

pnpm build

cd .hugo

hugo
