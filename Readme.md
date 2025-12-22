# E-Learning App - Complete Setup Guide for Beginners

**Don't worry if you've never done this before!** This guide will walk you through everything step-by-step. Just follow along carefully.

**No programming experience needed!** Just read and do exactly what's written.

---

## Part 1: Installing Required Software (One-Time Setup)

You need to install 3 things on your computer. Let's do them one by one:

### Step 1: Install Node.js

**What is Node.js?** It's the engine that runs the app on your computer.

1. **Open your web browser** (Chrome, Firefox, Edge, Safari - any browser)

2. **Go to this website:** Type this in your browser: `https://nodejs.org/`

3. You'll see **two big green buttons**:
   - One says **"LTS"** (Recommended for Most Users)
   - One says "Current"
   
4. **Click the "LTS" button** (the left one)

5. **Wait for download** - A file will download (it's about 30-50 MB)

6. **Find the downloaded file:**
   - **Windows:** Look in your "Downloads" folder
   - **Mac:** Look in your "Downloads" folder
   - The file name will be something like `node-v20.xx.x.msi` (Windows) or `node-v20.xx.x.pkg` (Mac)

7. **Double-click the file** to start installation

8. **Follow the installer:**
   - Click **"Next"**
   - Click **"Next"** again (accept the agreement)
   - Click **"Next"** (keep default location)
   - Click **"Next"** (keep all features)
   - Click **"Install"**
   - Wait for it to finish (takes 1-2 minutes)
   - Click **"Finish"**

9. **Verify it worked:**
   - **Windows:** 
     - Press `Windows Key + R` on your keyboard
     - Type `cmd` and press Enter
     - A black window will open (this is called "Command Prompt")
   - **Mac:** 
     - Press `Command + Space` on your keyboard
     - Type `terminal` and press Enter
     - A window will open (this is called "Terminal")
   
10. In the black window (Command Prompt/Terminal), **type this exactly:**
    ```
    node --version
    ```
    Then press Enter

11. You should see something like: `v20.11.0` or `v18.19.0`

✅ **If you see a version number like that, you're done with Step 1!**

❌ **If you see an error**, close the window, restart your computer, and try step 9 again.

---

### Step 2: Install Git

**What is Git?** It's a tool that helps you download code from the internet (specifically from GitHub).

1. **Open your web browser**

2. **Go to:** `https://git-scm.com/downloads`

3. You'll see three big icons: Windows, macOS, and Linux
   - **Click on your operating system**

4. **The download will start automatically**
   - File size is about 40-50 MB
   - Wait for it to finish

5. **Find the downloaded file** in your Downloads folder
   - **Windows:** File name like `Git-2.43.0-64-bit.exe`
   - **Mac:** File name like `git-2.43.0-intel-universal.pkg`

6. **Double-click the file** to start installation

7. **Click through the installer:**
   - Click **"Next"** (keep clicking Next for everything - defaults are fine)
   - You'll see about 8-10 screens - just keep clicking Next
   - Finally click **"Install"**
   - Wait for it to finish
   - Click **"Finish"**

8. **Verify it worked:**
   - **Windows:** Press `Windows Key + R`, type `cmd`, press Enter
   - **Mac:** Press `Command + Space`, type `terminal`, press Enter

9. **Type this exactly:**
   ```
   git --version
   ```
   Then press Enter

10. You should see something like: `git version 2.43.0`

✅ **If you see a version number, you're done with Step 2!**

❌ **If you see an error**, restart your computer and try step 8 again.

---

### Step 3: Install Expo Go on Your Phone

**What is Expo Go?** It's the app that lets you test the E-Learning App on your phone.

#### For Android Phones:

1. **Open Google Play Store** on your phone
2. **Tap the search bar** at the top
3. **Type:** `Expo Go`
4. **Look for the app** with a white icon that says "Expo Go"
5. **Tap "Install"**
6. **Wait for it to download and install** (it's free, about 50 MB)
7. ✅ **Done!** Don't open it yet.

#### For iPhone:

1. **Open App Store** on your phone
2. **Tap the search icon** at the bottom
3. **Type:** `Expo Go`
4. **Look for the app** with a white icon
5. **Tap "GET"** then **"Install"**
6. **Wait for it to download** (it's free, about 50 MB)
7. ✅ **Done!** Don't open it yet.

---

## Part 2: Getting the App Code from GitHub

Now we'll download the app code from GitHub to your computer.

### Step 1: Create a Folder for the App

1. **Go to your Desktop**
   - **Windows:** Click the Desktop icon or minimize all windows
   - **Mac:** Click on your Desktop

2. **Create a new folder:**
   - **Windows:** Right-click on empty space → "New" → "Folder"
   - **Mac:** Right-click on empty space → "New Folder"

3. **Name the folder:** `MyApps` (you can name it anything you want)

4. **Remember where this folder is!** We'll use it in the next step.

---

### Step 2: Open Command Prompt or Terminal

1. **Windows Users:**
   - Press `Windows Key + R`
   - Type `cmd`
   - Press Enter
   - A black window will open

2. **Mac Users:**
   - Press `Command + Space`
   - Type `terminal`
   - Press Enter
   - A window will open

✅ **Keep this window open!** We'll use it for the next steps.

---

### Step 3: Navigate to Your Folder

Now we need to tell the computer to work inside the folder we just created.

1. **In the Command Prompt/Terminal window, type this:**

   **Windows:**
   ```
   cd Desktop\MyApps
   ```

   **Mac:**
   ```
   cd Desktop/MyApps
   ```

2. **Press Enter**

3. You should now see your location changed to show the MyApps folder

✅ **You're now inside your folder!**

---

### Step 4: Download the App Code

This is where we actually download the code from GitHub.

1. **Copy this command exactly** (you can copy from here):
   ```
   git clone https://github.com/Ammarbashirharuna/e-learning.git
   ```

2. **Paste it into the Command Prompt/Terminal:**
   - **Windows:** Right-click in the window and choose "Paste"
   - **Mac:** Press `Command + V`

3. **Press Enter**

4. **Wait!** You'll see text scrolling:
   ```
   Cloning into 'e-learning'...
   remote: Enumerating objects: ...
   remote: Counting objects: 100%
   Receiving objects: 100%
   Resolving deltas: 100%
   ```

5. When it's done, you'll see something like:
   ```
   done.
   ```
   And your cursor will be blinking again.

✅ **The app code is now on your computer!**

---

### Step 5: Go Inside the App Folder

1. **Type this command:**
   ```
   cd e-learning
   ```

2. **Press Enter**

✅ **You're now inside the app folder!**

---

## Part 3: Installing Everything the App Needs

The app needs many small pieces of software (called "dependencies") to work. Let's install them all.

1. **Make sure you're in the app folder** (from the previous step)
   - Your Command Prompt/Terminal should show something ending with `e-learning`

2. **Type this command exactly:**
   ```
   npm install
   ```

3. **Press Enter**

4. **Now WAIT!** This is the longest step:
   - You'll see LOTS of text scrolling
   - You'll see percentages going up
   - You might see some warnings in yellow (that's okay!)
   - This takes **2-5 minutes** depending on your internet speed
   - **Do NOT close the window!**

5. **How do you know it's done?**
   - The scrolling text will stop
   - You'll see your cursor blinking again
   - You won't see any red error messages

✅ **If you see the cursor blinking and no red errors, you're done!**

❌ **If you see red text saying "ERROR":**
   - Take a screenshot
   - Skip to the "Common Problems" section at the bottom

---

## Part 4: Starting the App

**This is the exciting part!** Let's run the app on your computer.

1. **Make sure you're still in the app folder**

2. **Type this command:**
   ```
   npx expo start
   ```

3. **Press Enter**

4. **Wait 10-30 seconds.** You'll see:
   - Text scrolling
   - Messages like "Starting Metro Bundler"
   - Eventually, a **QR CODE** will appear (looks like a square barcode)
   - Some instructions in different colors

5. **When you see the QR code, the app is ready!**
   - The text will say something like: `Metro waiting on exp://192.168.x.x:8081`
   - There will be options like "› Press a | open Android"

✅ **The app is now running on your computer!**

---

## Part 5: Opening the App on Your Phone

**VERY IMPORTANT:** Your phone and computer **MUST be on the same WiFi network!**

Check right now:
- What WiFi is your computer connected to?
- What WiFi is your phone connected to?
- **They must be the same!**

---

### For Android Phones:

1. **Open the Expo Go app** on your phone (the one you installed earlier)

2. **You'll see the home screen of Expo Go**

3. **Tap "Scan QR Code"** (it's usually a big button or at the bottom)

4. **Point your phone's camera at the QR code on your computer screen**
   - Make sure the whole QR code fits in the frame
   - Hold steady for 2-3 seconds

5. **Wait!** You'll see:
   - "Opening project..."
   - "Downloading JavaScript bundle..." with a percentage
   - This takes 10-30 seconds the first time

6. **The app will open!** You should see the E-Learning App interface.

✅ **Congratulations! The app is running on your phone!**

---

### For iPhone:

1. **Do NOT open Expo Go yet!**

2. **Open your regular Camera app** (the one you use to take photos)

3. **Point your camera at the QR code on your computer screen**
   - Don't take a photo, just point at it
   - Make sure the whole QR code is visible

4. **A notification will appear at the TOP of your screen:**
   - It will say something like "Open in Expo Go"

5. **Tap that notification**

6. **Your phone will automatically open Expo Go**

7. **Wait!** You'll see:
   - "Opening project..."
   - "Downloading JavaScript bundle..."
   - This takes 10-30 seconds the first time

8. **The app will open!** You should see the E-Learning App interface.

✅ **Congratulations! The app is running on your phone!**

---

### What If the QR Code Doesn't Work?

Don't panic! Try this:

#### Method 1: Use Tunnel Mode

1. **Go back to Command Prompt/Terminal**

2. **Press `Ctrl + C`** on your keyboard (this stops the app)

3. **Type:** `y` and press Enter (if it asks "Terminate batch job?")

4. **Now type this:**
   ```
   npx expo start --tunnel
   ```

5. **Press Enter**

6. **Wait for a new QR code to appear** (this takes a bit longer - up to 1 minute)

7. **Try scanning the new QR code** following the steps above

**Note:** Tunnel mode is slower, but it works even if you're on different WiFi networks!

---

## Part 6: Using the App

Now that the app is running on your phone, you can:

✅ **Browse courses** - Explore all available courses
✅ **Watch videos** - View course content
✅ **Take quizzes** - Test your knowledge
✅ **Track progress** - See what you've completed

**Important Notes:**

- **Keep Command Prompt/Terminal open!** If you close it, the app will stop working on your phone.
- **Keep your computer on!** The app needs the computer to keep running.
- **Changes reload automatically** - If the developer makes changes, you'll see them update on your phone automatically.

---

## Part 7: Stopping the App

When you're done testing and want to stop:

1. **Go to the Command Prompt/Terminal window**

2. **Press `Ctrl + C`** on your keyboard

3. **If it asks "Terminate batch job? (Y/N)":**
   - Type `y`
   - Press Enter

4. **You'll see your cursor blinking again**

5. **You can now close the window**

✅ **The app is stopped!**

---

## Running the App Again (Next Time)

After you've set everything up once, running it again is MUCH easier!

**Every time you want to run the app:**

1. **Open Command Prompt/Terminal:**
   - **Windows:** Press `Windows Key + R`, type `cmd`, press Enter
   - **Mac:** Press `Command + Space`, type `terminal`, press Enter

2. **Go to the app folder:**
   - **Windows:** Type: `cd Desktop\MyApps\e-learning`
   - **Mac:** Type: `cd Desktop/MyApps/e-learning`
   - Press Enter

3. **Start the app:**
   - Type: `npx expo start`
   - Press Enter

4. **Scan the QR code** with Expo Go

That's it! Only 4 steps!

---

## Common Problems & How to Fix Them

### Problem 1: "git is not recognized" or "git: command not found"

**What this means:** Git didn't install correctly.

**How to fix:**
1. Restart your computer
2. Try installing Git again (go back to Part 1, Step 2)
3. After installing, close and reopen Command Prompt/Terminal

---

### Problem 2: "npm is not recognized" or "npm: command not found"

**What this means:** Node.js didn't install correctly.

**How to fix:**
1. Restart your computer
2. Try installing Node.js again (go back to Part 1, Step 1)
3. After installing, close and reopen Command Prompt/Terminal

---

### Problem 3: "Cannot connect to Metro" or "Could not connect to development server"

**What this means:** Your phone and computer are not communicating.

**How to fix:**
1. **Check WiFi:** Make sure your phone and computer are on the SAME WiFi network
2. **Restart the app:**
   - Press `Ctrl + C` in Command Prompt/Terminal
   - Type: `npx expo start --tunnel`
   - Try scanning the QR code again
3. **Turn off VPN** if you have one running on your computer or phone
4. **Restart your WiFi router** (unplug it, wait 10 seconds, plug it back in)

---

### Problem 4: QR Code won't scan

**How to fix:**

**For Android:**
- Make sure you opened the Expo Go app first
- Make sure you tapped "Scan QR Code" inside Expo Go
- Try making the QR code bigger on your computer screen (zoom in your Command Prompt/Terminal)
- Make sure there's good lighting

**For iPhone:**
- Use the regular Camera app, NOT Expo Go
- Make sure your camera is focusing on the QR code
- Try moving your phone closer or further away
- Make sure iOS is up to date (Settings → General → Software Update)

---

### Problem 5: App shows error screen with red text

**How to fix:**
1. **In Command Prompt/Terminal, press `Ctrl + C`**
2. **Type:** `npx expo start --clear`
3. **Press Enter**
4. **Wait for the QR code and try again**

---

### Problem 6: "Port 8081 already in use"

**What this means:** Another program is using the same port.

**How to fix:**
1. **Close all Command Prompt/Terminal windows**
2. **Restart your computer**
3. **Try running the app again**

OR

1. **Type:** `npx expo start --port 8082`
2. **Press Enter**
3. **Scan the new QR code**

---

### Problem 7: Downloaded the wrong files or app not working

**How to fix - Start Fresh:**

1. **Delete the e-learning folder:**
   - Go to Desktop → MyApps
   - Delete the "e-learning" folder

2. **Start again from Part 2, Step 2** (downloading the code again)

---

### Problem 8: Expo Go says "Something went wrong"

**How to fix:**
1. **Shake your phone** (yes, literally shake it!)
2. **A menu will appear**
3. **Tap "Reload"**

If that doesn't work:
1. **Close Expo Go completely** (swipe it away from recent apps)
2. **Open Command Prompt/Terminal**
3. **Press `Ctrl + C`**
4. **Type:** `npx expo start --clear`
5. **Scan the QR code again**

---

## Tips & Tricks

### Tip 1: Keep Everything Organized
- Put the app in a folder you'll remember (like Desktop/MyApps)
- Don't move the folder after you've installed everything

### Tip 2: Same WiFi is Critical
- Before you start, always check that your phone and computer are on the same WiFi
- If you're on a corporate or school WiFi, it might block connections - use a mobile hotspot instead

### Tip 3: First Load is Always Slow
- The very first time you scan the QR code takes 30-60 seconds
- After that, it's much faster (5-10 seconds)

### Tip 4: Don't Close Command Prompt/Terminal
- As long as you're testing the app, keep that window open
- If you close it accidentally, just run `npx expo start` again

### Tip 5: Shake to Debug
- If something looks wrong on your phone, shake it to open the debug menu
- Tap "Reload" to refresh the app

---

## Checklist - Did You Do Everything?

Before asking for help, check you've done all these:

- [ ] Installed Node.js (can run `node --version` successfully)
- [ ] Installed Git (can run `git --version` successfully)
- [ ] Installed Expo Go on your phone
- [ ] Downloaded the app code with `git clone`
- [ ] Ran `npm install` and waited for it to finish
- [ ] Started the app with `npx expo start`
- [ ] Phone and computer are on the same WiFi
- [ ] Scanned the QR code correctly

---

## What to Do If NOTHING Works

If you've tried everything and still can't get it working:

1. **Take screenshots of:**
   - The error message in Command Prompt/Terminal
   - The error on your phone (if any)

2. **Write down:**
   - Your operating system (Windows 10, Windows 11, macOS Ventura, etc.)
   - What step you're stuck on
   - What you see vs what you expected to see

3. **Contact the developer** (Ammar) with:
   - The screenshots
   - The information above
   - A description of what happened

4. **Don't give up!** These things can be tricky the first time, but once it works once, it'll work every time.

---

## Quick Reference Card

**Print this out or save it!**

```
EVERY TIME YOU WANT TO RUN THE APP:

1. Open Command Prompt/Terminal
   Windows: Windows Key + R, type "cmd", Enter
   Mac: Command + Space, type "terminal", Enter

2. Go to app folder
   Windows: cd Desktop\MyApps\e-learning
   Mac: cd Desktop/MyApps/e-learning

3. Start app
   npx expo start

4. Scan QR code with Expo Go

TO STOP THE APP:
   Press Ctrl + C
   Type "y" if asked
   Close window

TROUBLESHOOTING:
   Not working? Try: npx expo start --tunnel
   Still not working? Try: npx expo start --clear
   Still not working? Restart computer
```

---

## Frequently Asked Questions

**Q: Do I need to pay for anything?**
A: No! Everything is free - Node.js, Git, Expo Go, and the app itself.

**Q: How much internet data does this use?**
A: The initial download is about 100-200 MB. After that, very little (only when you reload the app).

**Q: Can I run this without internet?**
A: You need internet for the initial setup, but the app itself works offline once loaded.

**Q: Will this harm my computer?**
A: No! Everything we're installing is safe and used by millions of developers worldwide.

**Q: How do I uninstall everything?**
A: 
- Uninstall Node.js from Control Panel (Windows) or Applications folder (Mac)
- Uninstall Git from Control Panel (Windows) or Applications folder (Mac)
- Delete the e-learning folder
- Uninstall Expo Go from your phone

**Q: Can I use this on multiple phones?**
A: Yes! Just scan the QR code from any phone with Expo Go installed.

**Q: Do I need to keep my computer on while using the app?**
A: Yes, your computer needs to stay on and connected to WiFi while you're testing.



