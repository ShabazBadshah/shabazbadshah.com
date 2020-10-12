#!/bin/sh

AUDIT_REPORTS_DIR="audit-reports"
LIGTHOUSE_EXEC_PATH='../../node_modules/.bin'

NODE_ENV='production'

printf "Killing all previous instances of gatsby\n"
ps au | grep "gatsby" | awk -F" " '{print $2}' | xargs kill -SIGTERM

yarn run clean && yarn run build && (yarn run serve:bg)

mkdir -p $AUDIT_REPORTS_DIR

CURR_DATE_TIME=`date +"%Y-%m-%d-%T"`
CURR_AUDIT_REPORT_FOLDER="lighthouse-$CURR_DATE_TIME"
# --print-config
cd $AUDIT_REPORTS_DIR
command mkdir $CURR_AUDIT_REPORT_FOLDER && cd $CURR_AUDIT_REPORT_FOLDER
$LIGTHOUSE_EXEC_PATH/lighthouse --print-config > audit-config.json
$LIGTHOUSE_EXEC_PATH/lighthouse http://localhost:9000 --max-wait-for-load=20000 --enable-error-reporting --verbose --save-assets --view
cd ../..

printf "\n Audit report saved in audit-reports/$CURR_AUDIT_REPORT_FOLDER\n"

ps au | grep "gatsby" | awk -F" " '{print $2}' | xargs kill -SIGTERM
NODE_ENV=development
