provider "aws" {
    region = "eu-west-2"
}


resource "aws_elastic_beanstalk_application" "wordle3" {
    name = "wordle3" 
}


resource "aws_elastic_beanstalk_environment" "wordle3-dev" {
    name = "wordle3-dev"
    application = aws_elastic_beanstalk_application.wordle3.name
    solution_stack_name = "64bit Amazon Linux 2 v5.8.3 running Node.js 18"
    setting {
        namespace = "aws:autoscaling:launchconfiguration"
        name = "IamInstanceProfile"
        value = "elastic-beanstalk-ec2-role"
    }
}


resource "aws_elastic_beanstalk_environment" "wordle3-prod" {
    name = "wordle3-prod"
    application = aws_elastic_beanstalk_application.wordle3.name
    solution_stack_name = "64bit Amazon Linux 2 v5.8.3 running Node.js 18"
    setting {
        namespace = "aws:autoscaling:launchconfiguration"
        name = "IamInstanceProfile"
        value = "elastic-beanstalk-ec2-role"
    }
}


resource "aws_codepipeline" "wordle3-pipeline" {
    name = "wordle3-pipeline"
    role_arn = aws_iam_role.codepipeline-role.arn

    artifact_store {
        location = aws_s3_bucket.codepipeline3-bucket.bucket
        type = "S3"
    }

    stage {
        name = "Source"

        action {
            name = "codecommit-source-action"
            category = "Source"
            owner = "AWS"
            provider = "CodeCommit"
            version = "1"
            output_artifacts = ["source_output"]

            configuration = {
                RepositoryName = aws_codecommit_repository.wordle3-repo.repository_name
                BranchName = "main"
            }
        }
    }

    stage {
        name = "Deploy"

        action {
            name = "Deploy"
            category = "Deploy"
            owner = "AWS"
            provider = "ElasticBeanstalk"
            version = "1"
            input_artifacts = ["source_output"]

            configuration = {
                ApplicationName = "wordle2"
                EnvironmentName = "Wordle2-dev"
            }
        }
    }
}

data "aws_iam_policy_document" "assume-role" {
    statement {
        effect = "Allow"
        principals {
            type = "Service"
            identifiers = ["codepipeline.amazonaws.com"]
        }

        actions = ["sts:AssumeRole"]
    }
}

resource "aws_iam_role" "codepipeline-role" {
    name = "codepipeline-role"
    assume_role_policy = data.aws_iam_policy_document.assume-role.json
}


///// this needs fixing
data "aws_iam_policy_document" "codepipeline-policy" {
    statement {
        effect = "Allow"

        actions = [
            "s3:ListBucket",
      "s3:ListBucketVersions",
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:PutObjectAcl",
      "s3:PutObject",
        ]

        resources = [
            aws_s3_bucket.codepipeline3-bucket.arn

        ]
    }

    statement {
        effect = "Allow"
        actions = ["codecommit:GitPull"]
        resources = [aws_codecommit_repository.wordle3-repo.arn]
    }
}
resource "aws_iam_role_policy" "codepipeline-policy" {
    name = "codepipeline-policy"
    role = aws_iam_role.codepipeline-role.id
    policy = data.aws_iam_policy_document.codepipeline-policy.json
}

//////

resource "aws_iam_role_policy_attachment" "codepipeline-role-policy-attachment" {
  role       = aws_iam_role.codepipeline-role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeCommitPowerUser"
}

resource "aws_iam_policy" "codecommit-policy" {
  name        = "codecommit-policy"
  description = "Permissions for CodeCommit repository access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowUploadArchive",
      "Effect": "Allow",
      "Action": "codecommit:UploadArchive",
      "Resource": "arn:aws:codecommit:eu-west-2:665607411841:wordle3"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "codecommit-policy-attachment" {
  name       = "codecommit-policy-attachment"
  roles      = [aws_iam_role.codepipeline-role.id]
  policy_arn = aws_iam_policy.codecommit-policy.arn
}




resource "aws_codecommit_repository" "wordle3-repo" {
  repository_name = "wordle3"
}


resource "aws_s3_bucket" "codepipeline3-bucket" {
    bucket = "codepipeline3-bucket"
}












