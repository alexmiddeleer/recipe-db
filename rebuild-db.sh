#!/bin/bash
rm -f recipes.db
cat recipes.sql dummy-data.sql | sqlite3 recipes.db
