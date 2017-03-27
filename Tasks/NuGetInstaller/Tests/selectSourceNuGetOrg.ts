import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');
import util = require('./NugetMockHelper');

let taskPath = path.join(__dirname, '..', 'nugetinstaller.js');
let tmr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);
let nmh: util.NugetMockHelper = new util.NugetMockHelper(tmr);

nmh.setNugetVersionInputDefault();
tmr.setInput('solution', 'packages.config');
tmr.setInput('selectOrConfig', 'select');
tmr.setInput('includeNuGetOrg', 'True');



let a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    "osType": {},
    "checkPath": {
        "c:\\agent\\home\\directory\\packages.config": true
    },
    "which": {},
    "exec": {
        "c:\\agent\\home\\directory\\externals\\nuget\\nuget.exe restore c:\\agent\\home\\directory\\packages.config -Source https://www.nuget.org/api/v2/ -NonInteractive": {
            "code": 0,
            "stdout": "NuGet output here",
            "stderr": ""
        }
    },
    "exist": {},
    "stats": {
        "c:\\agent\\home\\directory\\packages.config": {
            "isFile": true
        }
    }
};
nmh.setAnswers(a);

nmh.registerNugetUtilityMock(["c:\\agent\\home\\directory\\packages.config"]);
nmh.registerDefaultNugetVersionMock();
nmh.registerToolRunnerMock();

tmr.run();