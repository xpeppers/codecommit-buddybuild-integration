---
We assume that you already have a CodeCommit repository populated with a mobile application.
REQUIRED: docker, docker-compose
---

[1] create a new project from ssh repository on BuddyBuild insert something like this
`123` only to get the generated ssh key

copy ssh public key from BuddyBuild.


Create IAM user with CodeCommit ReadOnly Access, call it something like `BuddyBuild`

Go to `Security credentials` of the created `BuddyBuild` user

and upload a new SSH key (bring it from BuddyBuild App Configuration Screen)

copy SSH_KEY_ID and insert it into ssh path of BuddyBuild (into this section: [1])
`git clone ssh://[SSH_KEY_ID]@git-codecommit.eu-west-1.amazonaws.com/v1/repos/test-codecommit-repository`

Click start build app on BuddyBuild

---
add trigger to the lambda (http://docs.aws.amazon.com/codecommit/latest/userguide/how-to-notify-lambda-cc.html)

configure variables of this repo with
```
AWS_ACCESS_KEY=[AWS_ACCESS_KEY_FOR_DEPLOY_LAMBDA]
AWS_SECRET_KEY_ID=[AWS_ACCESS_SECRET_FOR_DEPLOY_LAMBDA]
access_token=[BUDDYBUILD_ACCESS_TOKEN]
app_id=[BUDDYBUILD_APP_ID]
```

deploy Lambda

try to push a commit to the target CodeCommit, the build will be visible after build process terminated
```



---

Go to myProfile -> access_token
copy the access_token
copy the app id from url

This is the curl to call in post for trigger a new build with last commit
`curl -X POST -H 'Authorization: Bearer [ACCESS_TOKEN]' 'https://api.buddybuild.com/v1/apps/[APP_ID]/build'`
It Returns `{"build_id":"123456789101112"}`


Change parameters
sls deploy --stage [STAGE]


Setup CodeCommit hook to invoke the Lambda (!!!From Lambda Console!!!)

----

Copy .env.template to .env file and fill the fields

docker-compose up -d
docker-compose exec codecommit-buddybuild serverless deploy --stage test











