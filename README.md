# Wordle - AWS


## Instructions

If you are using the keyboard:
- Use the arrow keys to navigate through the on-screen keyboard to select letters.
- Press the Enter key to submit your guess.


## Deployment

this challenge was deployed using AWS infrastructure.
An attempt was made to recreate the infrastructure using terraform. 
All the infrastructure was created successfuly but I couldn't add the necessary permission for codecommit to access the S3 bucket.

- Code added on AWS *Codecommit* for seamless integration.
- Created AWS Elastic Beanstalk application on a webserver environment to simplify infrastructure managment. 
- Created AWS Codepipeline CI/CD pipeline to automate delivery.


AWS Elastic Beanstalk creates the necessary resources and configurations so you can focus on your code.
A webserver environment creates:
- EC2 instance with Elastic IP
- Security groups
- S3 bucket
- Autoscaling groups
- Runs automated health checks

AWS Codepipeline stores the artifacts created throughout the stages in an S3 bucket to be ready for deployment while AWS Cloudwatch creates events for failed pipelines or stages



