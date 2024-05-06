@echo off
setlocal EnableDelayedExpansion

set "contador=1"

for %%f in (*.jpg) do (
    ren "%%f" "photo_!contador!.jpg"
    set /a contador+=1
)

echo Proceso completado.
pause