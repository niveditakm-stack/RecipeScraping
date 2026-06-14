export async function collectRecipeUrls(page, baseUrl, totalPages) {
  const allUrls = [];

  for (let i = 1; i <= totalPages; i++) {
    try {
      const pageUrl = `${baseUrl}?page=${i}`;
      console.log(`[Collector] Scraping page ${i}/${totalPages}: ${pageUrl}`);

      await page.goto(pageUrl, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(3000);

      const bodyText = await page.innerText("body").catch(() => "");
      if (bodyText.includes("Sorry, you have been blocked")) {
        console.log(`[Collector] Blocked on page ${i} — waiting 20s...`);
        await page.waitForTimeout(20000);
        await page.goto(pageUrl, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });
        await page.waitForTimeout(5000);
      }

      await page.waitForSelector(".img-block a", { timeout: 10000 });

      const rawUrls = await page.$$eval(".img-block a", (anchors) =>
        anchors.map((a) => a.getAttribute("href")),
      );

      const completeUrls = rawUrls
        .filter((url) => url !== null)
        .map((url) =>
          url.startsWith("/") ? `https://www.tarladalal.com${url}` : url,
        );

      allUrls.push(...completeUrls);
      console.log(
        `[Collector] Found ${completeUrls.length} URLs on page ${i}. Total: ${allUrls.length}`,
      );

      await page.waitForTimeout(Math.floor(Math.random() * 2000) + 3000);
    } catch (err) {
      console.error(`[Collector Error] Page ${i} failed:`, err.message);
    }
  }

  return allUrls;
}
