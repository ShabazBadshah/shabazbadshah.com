#!/bin/sh

AUDIT_REPORTS_DIR="audit-reports"
NODE_ENV=production

printf "========== BUILDING GATSBY SITE  ==========\n"

printf "Killing all previous instances of gatsby\n"
ps au | grep "gatsby" | awk -F" " '{print $2}' | xargs kill -SIGTERM

npm run clean && npm run build && (npm run serve:bg)
printf "========== GATSBY SITE BUILT  ==========\n\n"

printf "========== RUNNING LIGHTHOUSE AUDIT ==========\n"

mkdir -p $AUDIT_REPORTS_DIR

CURR_DATE_TIME=`date +"%Y-%m-%d-%T"`
CURR_AUDIT_REPORT_FOLDER="lighthouse-$CURR_DATE_TIME"
# --print-config
cd $AUDIT_REPORTS_DIR
mkdir $CURR_AUDIT_REPORT_FOLDER && cd $CURR_AUDIT_REPORT_FOLDER
../../node_modules/.bin/lighthouse --print-config > audit-config.json
../../node_modules/.bin/lighthouse http://localhost:9000 --max-wait-for-load=20000 --enable-error-reporting --verbose --save-assets --view
cd ../..

printf "\n Audit report saved in audit-reports/$CURR_AUDIT_REPORT_FOLDER"
printf "\n========== LIGHTHOUSE AUDIT COMPLETE ==========\n\n"

ps au | grep "gatsby" | awk -F" " '{print $2}' | xargs kill -SIGTERM
NODE_ENV=development
