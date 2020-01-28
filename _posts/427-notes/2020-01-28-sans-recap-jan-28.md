---
layout: article
title: Sans Recap Jan 28
date: 2020-01-28
category: "427-notes"
---

# Sans Recap Jan 28

Jan 28, 2020 {#date}
----

[Podcast Link](https://isc.sans.edu/podcastdetail.html?id=6842) {#project-links}
----

## Cornavirus Situation

With the recent spike in interest in the "Coronavirus" situation, malicious individuals may utilize the events to spread false information and attempt to gain access to presonal information through email links.

Keep your eyes out for the following:

- Emails that you don't recognize
- Links that you don't recognize
- Non-official information from invalid sources
- Fake news

---

## DoS POC for Remote Desktop Gateway (RDG) Demoed

### Overview

Grants remote code execution (RCE) exploit which has not been released by the author through a vulnerability in RDG. [CVE-2020-0609](https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2020-0609). Demo of exploit is available by the author on [twitter](https:/[/twitter.com/layle_ctf/status/1221514332049113095?s=12]).

### Mitigation Techniques

- Update RDG application
- Use HTTPS
- Disable UDP packets

---

## Mitsubishi Electric compromised via Trend Micro vulnerability

### Overview

A 0-day vulnerability within the Trend Micro "Office Scan" antivirus application where a directory-traversal vulnerability allowed for remote code execution. An arbitrary zip-file uploaded to the scanning software would extract files into a specific "Office Scan" folder on the server. The extracted file could then run remote code execution (RCE) exploits.

A plethora of systems were compromised, and ~200MB of documents were stolen in June 2019. Trend Micro patched the application in October 2019.

### Brief Pseducode Examples

#### Directory Traversal Concatonation Example

```python
dir = ~/my_dir/important-documents
user_input = args[1] # user-input: ../pictures
traverse_dir = dir + user_input
print(traverse_dir) # ~/my_dir/important-documents/../pictures
```

#### Null Injecting String Example

```python
  dir = ~/my_dir/important-documents
  user_input = args[1] # user-input: ../../../etc/passwd'\x00'
  traverse_dir = dir + user_input + ".txt"
  print(traverse_dir) # ~/my_dir/important-documents/../../../etc/passwd
```

### Mitigation Techniques

__Validate your inputs via whitelisting__

When whitelisting strings, consider criteria such as:
  - Input length
  - Type of input
  - Full range of acceptable characters
  - Default/missing values for fields

---

## Resources

- Trend Micro vulnerability: 
  - [CVE-2019-18187](https://nvd.nist.gov/vuln/detail/CVE-2019-18187)
  - [CWE-22: Improper Limitation of a Pathname to a Restricted Directory](http://cwe.mitre.org/data/definitions/22.html)