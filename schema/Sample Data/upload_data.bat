IF NOT "%1"=="" (SET _mdr=%1)
IF "%_mdr%"=="" SET _mdr=http://localhost/MDR/Basic
ECHO Using "%_mdr%"
CALL do_upload_data.bat %_mdr% > upload_log.txt
PAUSE
ECHO termin�

