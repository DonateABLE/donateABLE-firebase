"use strict";

$(document).ready(function() {
    console.log("donate.js loaded");
    // set User information

    var minerStartTime = 0;
    var previousHashes = 0;

    /*
     * React to changes in the rangeslider
     */
    $("#MinerRange").on("propertychange input", function() {
        /** Set an element on screen to show the %age **/
        $("#MinerValue").val(this.value + "% CPU");

        /** Update the threshold **/
        var rate = this.value;
        var throttle = 1 - rate / 100;
        miner.setThrottle(throttle);
    });

    // Initialize the Crypto miner
    var miner = new Client.Anonymous(siteKey, {
        throttle: 0.5,
        ads: 0,
        autoThreads: true
    });

    // Register callback on mining operation start
    miner.on("open", function() {
        var d = new Date();
        minerStartTime = d.getTime();

        $(window).bind("beforeunload", function() {
            $.ajax({
                url: "/sitestats/leave",
                method: "POST",
                data: {
                    charityId: charityId
                }
            });
            return "Are you sure you want to leave? Mining will stop.";
        });

        setInterval(updateDonatedTo, 10000);
    });

    // register callback on stop button clicked
    $("#stopDonate").click(function() {
        $("#SlideMeter").removeClass("animated");

        if (miner.isRunning()) {
            miner.stop();
            $("#startButtonDiv").addClass("btn-donate-left");
            $("#startButtonDiv").removeClass("btn-donate-mid");
            $("#stopButtonDiv").addClass("btn-donate-mid");
            $("#stopButtonDiv").removeClass("btn-donate-left");

            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                }
            });
            $.ajax({
                url: "/sitestats/leave",
                method: "POST",
                data: {
                    charityId: charityId
                }
            });
        }
    });

    // Register callback on opt-in dialogue acceptance
    $("#optedIn").click(function() {
        $("#optIn").modal("hide");

        // Begin mining crypto
        miner.start();
        $("#SlideMeter").addClass("animated");

        $("#startButtonDiv").addClass("btn-donate-mid");
        $("#startButtonDiv").removeClass("btn-donate-left");
        $("#stopButtonDiv").addClass("btn-donate-left");
        $("#stopButtonDiv").removeClass("btn-donate-mid");

        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        });
        $.ajax({
            url: "/sitestats/join",
            method: "POST",
            data: {
                charityId: charityId
            }
        });
    });

    // Push updated stats to the server
    function updateDonatedTo() {
        if (miner.isRunning()) {
            // 1. Get the current total hashes
            var currentHashes = miner.getTotalHashes();
            var updatedData = {
                donationId: donationId,
                charityId: charityId,
                // 2. Subtract the last known number of hashes and the current
                totalHashes: currentHashes - previousHashes,
                totalTime: 10
            };

            // 3. Set the "last known" hashes to be the current temp
            // The difference between now and next upload is the number we push to the server
            previousHashes = currentHashes;

            $.ajax({
                url: "/donatedto/update",
                method: "POST",
                data: updatedData
            });
        }
    }

    // Update stats once per second
    setInterval(function() {
        var sessionHashRate = 0;
        var sessionHashes = 0;
        var sessionTime = 0;

        if (miner.isRunning()) {
            sessionHashRate = Math.round(miner.getHashesPerSecond());
            sessionHashes = miner.getTotalHashes();
            var currentTime = new Date().getTime();
            sessionTime = Math.round((currentTime - minerStartTime) / 1000);
            // Prevent issue where sessionTime is just the current time/1000
            if (minerStartTime === 0) sessionTime = 0;
        }
        // Output to HTML elements...
        document.getElementById("sessionHashes").innerHTML =
            "# " + sessionHashes;
        document.getElementById("sessionTime").innerHTML =
            sessionTime + " Seconds";
        document.getElementById("sessionHashRate").innerHTML =
            sessionHashRate + " Per Second";
    }, 1000);
});