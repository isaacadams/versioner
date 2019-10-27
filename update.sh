#!/bin/bash
# Sensible to set -e to ensure we exit if anything fails
#set -e

# Get the output from your tool.
# Paths are relative to the root of the repo
IFS=

output=`node.exe bin/versioner.js` # gets the usage output
output=${output//$'\n'/@@@@} # replaces newlines with something that doesn't break the following sed command
output=$(cat README.template.md | sed "s|>>> INSERTION POINT FOR HELP OUTPUT <<<|${output}|g") # replace usage with insertion point
output=${output//@@@@/$'<br>'} # put newlines back in except this time double them up for .md syntax
output=$(echo $output | sed 's|\s|\&nbsp;|g') # replace trailing spaces with html compatible ones &nbsp;
echo $output > README.md # output to the real README.md
#sed "s|>>> INSERTION POINT FOR HELP OUTPUT <<<|${output}|g" README.template.md > README.md

#git add README.md
read -p "Press enter to continue"