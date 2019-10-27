#!/bin/bash
# Sensible to set -e to ensure we exit if anything fails
#set -e

# Get the output from your tool.
# Paths are relative to the root of the repo
#IFS=
output=`node.exe bin/versioner.js` #sed 's|\\|\\\\|g'
#$(node bin/versioner.js -h)

output=`echo ${output} | tr '\n' "\\n"`
echo $output
sed "s|>>> INSERTION POINT FOR HELP OUTPUT <<<|${output}|g" README.template.md > README.md

#git add README.md
read -p "Press enter to continue"