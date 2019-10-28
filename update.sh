#!/bin/bash
# Sensible to set -e to ensure we exit if anything fails
#set -e

# Get the output from your tool.
# Paths are relative to the root of the repo
IFS=

output=`node.exe bin/versioner.js` # gets the usage output
output=${output//$'\n'/$'<br>'} # replaces newlines with something that doesn't break the following sed command
output=$(echo $output | sed 's|\s\{2,\}|\&ensp;\&ensp;|g') # replace multiple spaces with html compatible tabs &ensp;
sed "s|>>> INSERTION POINT FOR HELP OUTPUT <<<|${output//$'&'/$'\&'}|g" README.template.md > README.md

#git add README.md
read -p "Press enter to continue"