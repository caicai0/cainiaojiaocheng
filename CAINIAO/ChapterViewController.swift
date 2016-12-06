//
//  ChapterViewController.swift
//  CAINIAO
//
//  Created by liyufeng on 16/10/18.
//  Copyright © 2016年 liyufeng. All rights reserved.
//

import UIKit
import SQLite

class ChapterViewController: UIViewController {
    
    var href:String?
    var datas:Array<SQLite.Row>?
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.datas = Array<SQLite.Row>()
        self.tableView.register(NSClassFromString("UITableViewCell"), forCellReuseIdentifier: "cell")
        do{
            let path:String = Bundle.main.path(forResource: "db", ofType: "sqlite")!
            let db = try Connection(path)
            let book = Table("chapter")
            let chapters = book.filter(Expression<String>("bookHref") == self.href!)
            self.datas = Array(try db.prepare(chapters))
            self.tableView .reloadData()
        }catch{
            
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}

extension ChapterViewController:UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return (self.datas?.count)!
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath);
        let row = self.datas![indexPath.row]
        var name = row[Expression<String?>("chapterName")]
        name = name?.replacingOccurrences(of: "\n", with: "")
        name = name?.replacingOccurrences(of: "\r", with: "")
        cell.textLabel?.text = name
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "PageViewController", sender:indexPath)
    }
}

extension ChapterViewController {
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "PageViewController" {
            let controller : PageViewController = segue.destination as! PageViewController
            let indexPath : IndexPath = sender as! IndexPath
            let row = self.datas![indexPath.row]
            controller.href = row[Expression<String>("href")]
            controller.title = row[Expression<String>("chapterName")]
        }
    }
}
