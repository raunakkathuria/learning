#!/bin/bash
# A single script to generate an entry in for userlist.txt
# based on .env file

source .env

USERNAME=${DATABASE_USER}
PASSWORD=${DATABASE_PASSWORD}

echo "\"$USERNAME\" \"$PASSWORD\"" > userlist.txt
