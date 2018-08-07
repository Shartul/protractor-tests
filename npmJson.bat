setlocal EnableDelayedExpansion
for /f "skip=11 delims=*" %%b in (C:\ProtractorProjects\cdt\response_temp.json) do (
	echo %%b >> C:\ProtractorProjects\cdt\response.json
)
del C:\ProtractorProjects\cdt\response_temp.json
set "search=JSON: "
set "replace={"result": "
for /F "delims=" %%a in (C:\ProtractorProjects\cdt\response.json) do (
   set line=%%a
   setlocal EnableDelayedExpansion
   >> output.json echo(!line:%search%=%replace%!
)
del C:\ProtractorProjects\cdt\response.json
set "search=]"
set "replace= ] }"
for /F "delims=" %%a in (C:\ProtractorProjects\cdt\output.json) do (
   set line=%%a
   setlocal EnableDelayedExpansion
   >> treeMetaData.json echo(!line:%search%=%replace%!
)
del C:\ProtractorProjects\cdt\output.json
endlocal
