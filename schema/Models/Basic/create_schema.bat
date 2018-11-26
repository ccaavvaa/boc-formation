IF NOT "%1"=="" (SET _mdr=%1)
IF "%_mdr%"=="" SET _mdr=http://localhost/MDR/Basic
ECHO Using "%_mdr%" , press any key to continue
do_create_schema.bat %_mdr% > create_log.txt
ECHO termin�
ECHO press any key to continue
PAUSE
ECHO termin�
