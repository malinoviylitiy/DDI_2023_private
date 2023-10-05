#!/bin/bash
search_string="$1"
for data_file in /mnt/c/Users/Teclast/Documents/repositories/DDI_2023_private/linux101/data/*; do
    if [ -f "$data_file" ]; then
        grep "$search_string" "$data_file"
    fi
done
