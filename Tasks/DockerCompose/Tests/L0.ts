import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'vsts-task-lib/mock-test';
import tl = require('vsts-task-lib');

describe('Docker Compose Suite', function() {
    this.timeout(30000);
    before((done) => {
        done();
    });
    after(function () {
    });

    if(tl.osType().match(/^Win/)) {
         it('Runs successfully for windows docker compose service build', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Build services";
            tr.run();

            assert(tr.invokedToolCount == 1, 'should have invoked tool one times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker-compose -f F:\\dir2\\docker-compose.yml build") != -1, "docker compose build should run");
            console.log(tr.stderr);
            done();
        });

        it('Runs successfully for windows docker compose push service', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Push services";
            tr.run();

            process.env["__command__"] = "Build services";
            assert(tr.invokedToolCount == 1, 'should have invoked tool one times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker push dir2_web:latest") != -1, "docker compose push should run");
            console.log(tr.stderr);
            done();
        });

        it('Runs successfully for windows docker compose run service', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Run services";
            tr.run();

            process.env["__command__"] = "Build services";
            assert(tr.invokedToolCount == 1, 'should have invoked tool three times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker-compose -f F:\\dir2\\docker-compose.yml up") != -1, "docker compose push should run");
            console.log(tr.stderr);
            done();
        });

        it('Runs successfully for windows docker compose push service with ACR', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Push services";
            process.env["__container_type__"] = "Azure Container Registry";
            process.env["__qualifyImageNames__"] = "true";
            tr.run();
            
            process.env["__command__"] = "Build services";
            process.env["__container_type__"] = "Container Registry";
            process.env["__qualifyImageNames__"] = "false";
            assert(tr.invokedToolCount == 1, 'should have invoked tool one times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker push ajgtestacr1.azurecr.io/dir2_web:latest") != -1, "docker compose push should run");
            console.log(tr.stderr);
            done();
        });

    } else {

        it('Runs successfully for linux docker compose service build', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Build services";
            tr.run();
            console.log(tr.stdout);
            assert(tr.invokedToolCount == 1, 'should have invoked tool one times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker-compose -f /tmp/tempdir/100/docker-compose.yml build") != -1, "docker compose build should run");
            console.log(tr.stderr);
            done();
        });

        it('Runs successfully for linux docker compose push service', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Push services";
            tr.run();

            process.env["__command__"] = "Build services";
            assert(tr.invokedToolCount == 1, 'should have invoked tool one times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker push dir2_web:latest") != -1, "docker compose push should run");
            console.log(tr.stderr);
            done();
        });

        it('Runs successfully for linux docker compose run service', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Run services";
            tr.run();

            process.env["__command__"] = "Build services";
            assert(tr.invokedToolCount == 1, 'should have invoked tool three times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker-compose -f /tmp/tempdir/100/docker-compose.yml up") != -1, "docker compose push should run");
            console.log(tr.stderr);
            done();
        });

        it('Runs successfully for linux docker compose push service with ACR', (done:MochaDone) => {
            let tp = path.join(__dirname, 'L0Windows.js');
            let tr : ttm.MockTestRunner = new ttm.MockTestRunner(tp);
            process.env["__command__"] = "Push services";
            process.env["__container_type__"] = "Azure Container Registry";
            process.env["__qualifyImageNames__"] = "true";
            tr.run();
            
            process.env["__command__"] = "Build services";
            process.env["__container_type__"] = "Container Registry";
            process.env["__qualifyImageNames__"] = "false";
            assert(tr.invokedToolCount == 1, 'should have invoked tool one times. actual: ' + tr.invokedToolCount);
            assert(tr.stderr.length == 0 || tr.errorIssues.length, 'should not have written to stderr');
            assert(tr.succeeded, 'task should have succeeded');
            assert(tr.stdout.indexOf("[command]docker push ajgtestacr1.azurecr.io/dir2_web:latest") != -1, "docker compose push should run");
            console.log(tr.stderr);
            done();
        });

    }
});