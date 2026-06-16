export async function collectRecipeUrls(page, baseUrl, totalPages) {
  const allUrls = [];

  for (let i = 1; i <= totalPages; i++) {
    try {
      const pageUrl = `${baseUrl}?page=${i}`;
      await page.goto(pageUrl, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      const bodyText = await page
        .locator("body")
        .innerText()
        .catch(() => "");
      if (bodyText.includes("Sorry, you have been blocked")) {
        console.warn(`[Collector] Blocked on page ${i} — waiting 20s...`);
        await page.waitForTimeout(20000);
        await page.goto(pageUrl, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });
      }

      const linkLocator = page.locator(".img-block a");

      await linkLocator.first().waitFor({ state: "attached", timeout: 10000 });

      const rawUrls = await linkLocator.evaluateAll((anchors) =>
        anchors.map((a) => a.getAttribute("href")),
      );

      const completeUrls = rawUrls
        .filter((url) => url !== null)
        .map((url) => new URL(url, page.url()).href);

      allUrls.push(...completeUrls);
    } catch (err) {
      console.error(`[Collector Error] Page ${i} failed:`, err.message);
    }
  }

  return allUrls;
}
