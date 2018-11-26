IF NOT "%1"=="" (SET _mdr=%1)
IF "%_mdr%"=="" SET _mdr=http://localhost/MDR/Basic
ECHO Using "%_mdr%"
PAUSE
do_delete_schema.bat %_mdr% > delete_log.txt

PAUSE

echo termin�