Go to the gitCommand to generate sshkey
Type in the command ssh-keygen -t rsa -b 4090 -C "kamaradennis36@gmail.com"
Then give the file the name "anotherSSHKey"
Then to list the sshkey generated
Type ls | grep "anotherSSHKey"
Then type "cat anotherSSHKey.pub"
highlight it,then the file is being copied automatically
Then go to my github account (website), and add new sshkey,generated

// to run sshagent
type eval "$(ssh-agent -s)"
and ssh-add ~ /.ssh/anotherSSHKey

Dennis when pushing don't forget the command is
git push origin master 
