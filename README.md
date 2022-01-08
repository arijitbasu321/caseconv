# Caseconv
A utility to switch back and forth between snake and camel case code

#Installation
npm i caseconv

# Example
<b>Convert to Snake:</b><br />
ccase --type snake --input sample1.js --output sample2.js

<b>Convert to Camel:</b><br />
ccase --type camel --input sample1.js --output sample2.js

# Note
The program ignores variable names which start with a capital letter or contain '-'. This is done to preserve pascal and kebab case. 
