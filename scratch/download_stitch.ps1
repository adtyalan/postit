# Create downloads directory
$baseDir = "d:\Coding\Personal\postit\downloads"
New-Item -ItemType Directory -Force -Path $baseDir

function Download-StitchScreen($name, $screenUrl, $codeUrl) {
    $screenPath = Join-Path $baseDir $name
    New-Item -ItemType Directory -Force -Path $screenPath
    
    Write-Host "Downloading $name..."
    curl.exe -L $screenUrl -o (Join-Path $screenPath "screenshot.png")
    curl.exe -L $codeUrl -o (Join-Path $screenPath "code.html")
}

# 1. Compose Message
Download-StitchScreen "Compose Message" `
    "https://lh3.googleusercontent.com/aida/ADBb0uh6rQnJBHUGMpTJYKLbA8KbGDk8oOgBZzvch2k_K7ajVBox-dMLVbP9WEoElwQPYph7IMY7f9RPpddeCGN5jG2zXdIJHGlTc8rRTGcjzFhoWsfxp2ecSXDxkkdbqTmzTxEfdogPu_8So1IPK_XALA_G1uETA6VPIk8QGUSaV3ghQ2eUZte8VzUNyKlUJDISJFHPGABQz22k2QCW7tT97_Jyob23GOB93lfuuqhXhld4Dq1ZvG-FVdYxgw0" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzlhZDA2NTFiODI1ZjQ5NWZhNGM0YzdkYzc5YTA5ZTlhEgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=89354086"

# 2. Seal & Send
Download-StitchScreen "Seal and Send" `
    "https://lh3.googleusercontent.com/aida/ADBb0ugF0H3vUj1szPcRIPUG7JtlaROvnW88gwVLDi84DTmRp5yta66-YOEAxVYJ8dG8X9tVipGXaB4Vz2LaGNiZtulieezImGe78BuVPS6PK9mcgM6j-7lklQ0iRw8bv7Iwo2ehyhfCZAhNZZQqVdhN9eQVBOb_VJnasmOsH9jF3zoHCV3efqQKsaInecOVfwZqysAsXBl5YdQYQz6ipBkgVm6U1TDwb6i8xCGf-A2txKWdtfoykZnCreVPKLM" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzRlNmFjZWVlYTUyMDRjY2ZiMDFlODc4OGQ1ZDNmMTI3EgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=89354086"

# 3. Seal, Send & Share
Download-StitchScreen "Seal Send and Share" `
    "https://lh3.googleusercontent.com/aida/ADBb0uhJA0WXrYerj1U-Eo-Y4y4jyO7-unturPySZGtwt_kGp8bkMlP5tAxSQoHAubpabiKZVNEKC9R1NjSZY6mlqzScFRxljkSXCkZ3RlVDESt4BWxGDPrPte_eIUHiep2qhiEAdBCIXuYH10a8szGDJbblvDUiSGl8g6gJq2Of4_a3dPZoW7BQg61qqcNUmnzALJ4IDOHWBpx3zvQwS-K5uPZ_Xl0Phwj5pB51L2K7cGK_dfRF0Pf2n3FRlBLU" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2Q4YTk5MWQ3MTk2ZDRiMTQ5NWFhY2VlYmNjYWQ1ZWI5EgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=96797242"

# 4. The Dead Letter Office
Download-StitchScreen "Dead Letter Office" `
    "https://lh3.googleusercontent.com/aida/ADBb0ug-eJG9B0XXRezPTgC2ym4aU5XU6Rbsf7tfppIawNc4MXKgPEinqohX86M4nVVAylHzpDiu8taykq_l_j0OGV7-D59RZXOVynwhvtDL1puydD4hMe3k6WKCK5hfih4Xr2us8auMltCFpBlMBXEelbIW0f9W3vbELyIou1xrrH4OWnohx8X8SVfj-a7f1QRlTovTxMlmTvjxr5DhE5WCXwn7nWHhWKUgnjRJ040b1Zy648MSQnWg" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU5YjFkMTE4MjUyZTQzNTJiODJjMTA5YTZiMzU3Zjc5EgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=89354086"

# 5. The Forgotten Archives
Download-StitchScreen "Forgotten Archives" `
    "https://lh3.googleusercontent.com/aida/ADBb0ujjWA21ptzwgnOG69KVQohjuBVaAJJHXocM-oHnFRuTBG74VVT8yNvpoHTXv14Ni6mnx_sJNOjIh1bWdKLQ1wCrNTSWzalvD11FnhWqx20lVrLuOIiWfeYTNF9-QcmbtnbOkVxhsXAB9TV-sPQDMsoDShyCUpPxWwwNwYtYIXORdBOTKNMAhtUvD_heuQ6dqwiS8bSE-aPemG12mwguoy-CRTtlyMmN_kWUvV1b7ECe8sHCovk-PEuK7cp8" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzBmYTFjOWZhNmIwYTQ0MmY5ZTAzODI0NTU4NzAwNDU2EgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=96797242"

# 6. Read Message (e6b7...)
Download-StitchScreen "Read Message 1" `
    "https://lh3.googleusercontent.com/aida/ADBb0uiRGxLIeYGLuYUV25U7HrBmHJv2frSYBOicTcSr6wnOns3Z7Ho5aS_Z7x1YFfI3oAYRTrDTIyHPDrKC8qeTsGtjKAT3K3IIWmDJf6Bg_DZfsPp3n20rL8IDQcUcCeLh4-n5rZVcjyEC1zdlDxyfgBrfA7-6MK2qfw5IgDDErvYvg8rUOMmhef-rTUQ4Z0SH0gDlYR_NkjBnLT_NxOVQ-4bhUclI4jyQDdr8yXNrYUGReH9sbS9r0zQaadL1" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNjNjNmYzUyNzQwZjRkYWQ5YTEyM2Y3YTdhN2RjYzkxEgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=89354086"

# 7. Unboxing the Message
Download-StitchScreen "Unboxing the Message" `
    "https://lh3.googleusercontent.com/aida/ADBb0ughv-PcRw0rIVr5hSPjDaO7ZWlfRXcqDk54wZaQ1FUmWqKisCqQu4G9V87_Ih4NKIqhzbgC_hV8MprTVrpO-ustz8lxBE9VtjJy5JflPh7T8D6eh2QwYCp0_QO3rD1CNICGmeCmRWqUpBSmugfeKWak2tToJpJZH92tFEFS9i-yz6uUAnxfxyJ3fp0oCZWnOLkhQfQtdo9-Nr98r21Q7Csrxxg3YZODVpBFBLHkpzXbpcqEMwTnJ7pCG-tN" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VjOGM0ZjEwNTliMTQwODBiYTlmNWUwYzJiY2I3Y2UzEgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=96797242"

# 8. Read Message (dcc2...)
Download-StitchScreen "Read Message 2" `
    "https://lh3.googleusercontent.com/aida/ADBb0uijxjiYkrMV2vjFdH5SXfNub5juC6Vf7y6ugSp1GWcsA3SGCdq1E0WzoXWbbNMHiJ8wIoA8o_vOY_ciKvo0F8Yu2A5mVicjOiG4Z8XE3Qfl6hHz0SOmO--RgYrsQDK6VwIc33OIievnB4BHDF0uw3_bN5GrCrSYpwGbCReSvM6utx7LZKSR-KCuFlhqLQxyaRbWDEAgiUxQzrU7TiHGKCwSY0s4EYMxkOtd56zhZ-h9u2tc91V49gtqJGGO" `
    "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzE2YzQ4MjM2ZDg3ZjQ4NTZiYTA4YjljNTM4ZGFlZDNlEgsSBxC01bio-gUYAZIBJAoKcHJvamVjdF9pZBIWQhQxNzI0NDA2NDAwMjEwMzcwNzAxMA&filename=&opi=89354086"
