@echo off
setlocal EnableDelayedExpansion

set "contador=1"

for %%f in (*.jpg) do (
    ren "%%f" "photo_!contador!.png"
    set /a contador+=1
)

echo Proceso completado.
pause