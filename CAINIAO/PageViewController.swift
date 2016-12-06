//
//  PageViewController.swift
//  CAINIAO
//
//  Created by liyufeng on 16/10/18.
//  Copyright © 2016年 liyufeng. All rights reserved.
//

import UIKit
import SQLite

class PageViewController: UIViewController {
    var href : String?
    
    @IBOutlet weak var webView: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        do{
            let path:String = Bundle.main.path(forResource: "db", ofType: "sqlite")!
            let db = try Connection(path)
            let book = Table("page")
            let chapters = book.filter(Expression<String>("href") == self.href!)
            let datas = Array(try db.prepare(chapters))
            let one = datas.first;
            let bundlePath = Bundle.main.bundlePath;
            let wwwPath = bundlePath+"/www"
            var htmlString = try String(contentsOfFile: wwwPath + "/HTML.html")
            htmlString = htmlString.replacingOccurrences(of: "<div class=\"article-body\">", with: "<div class=\"article-body\">".appending(one![Expression<String>("html")]))
            print(one![Expression<String>("href")])
            self.webView.loadHTMLString(htmlString, baseURL: URL(fileURLWithPath: wwwPath))
        }catch let err as NSError{
            print("\(err)")
        }
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
