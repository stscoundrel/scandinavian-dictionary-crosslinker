use std::fs;
use std::collections::HashMap;
use futures::future;
use reqwest::Client;

#[tokio::main]
async fn main() {
    let mut urls = HashMap::new();
    urls.insert("old-norse", "https://cleasby-vigfusson-dictionary.vercel.app/sitemap.xml");
    urls.insert("old-icelandic", "https://old-icelandic.vercel.app/sitemap.xml");
    urls.insert("old-norwegian", "https://old-norwegian-dictionary.vercel.app/sitemap.xml");
    urls.insert("old-swedish", "https://old-swedish-dictionary.vercel.app/sitemap.xml");
    urls.insert("old-danish", "https://old-danish-dictionary.vercel.app/sitemap.xml");

    let client = Client::new();

    println!("Downloading sitemaps.");

    let requests = future::join_all(urls.into_iter().map(|(filename, url)| {
        println!("Downloading {filename} sitemap");
        let client = &client;
        let filename = format!("../resources/{filename}.xml");
        async move {
            let resp = client.get(url).send().await.unwrap();
            let content = resp.bytes().await.unwrap();
            (filename, content)
            
        }
    }))
    .await;

    for (location, data) in requests {
        println!("Saving {location} to a file...");
        fs::write(location, data).expect("Failed to save file!");
    }

    println!("Done!");
}
