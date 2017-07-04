#!/bin/bash
lftp -c "set ftp:list-options -a;
set ftp:ssl-allow no;
open '$1';
lcd $2;
cd $3;
mirror -p --reverse \
    --delete \
    --verbose \
    --exclude-glob logs/ \
    --exclude-glob uploads/;
quit"
