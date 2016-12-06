//
//  ViewController.swift
//  CAINIAO
//
//  Created by liyufeng on 16/10/18.
//  Copyright © 2016年 liyufeng. All rights reserved.
//

import UIKit
import SQLite

class ViewController: UIViewController {

    @IBOutlet weak var tableView: UITableView!
    var datas : Array<SQLite.Row>?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.datas = Array()
        self.tableView.register(NSClassFromString("UITableViewCell"), forCellReuseIdentifier: "cell")
        do{
            let path:String = Bundle.main.path(forResource: "db", ofType: "sqlite")!
            let db = try Connection(path)
            let book = Table("book")
            let books:AnySequence<SQLite.Row> = try db.prepare(book as QueryType)
            for user in books{
                self.datas?.append(user)
            }
            self.tableView .reloadData()
        }catch{
            
        }
        
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

extension ViewController:UITableViewDelegate,UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let count = (self.datas?.count)!
        return count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath);
        let row = self.datas![indexPath.row]
        cell.textLabel?.text = row[Expression<String?>("bookName")]
        cell.detailTextLabel?.text = row[Expression<String?>("category")]
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "ChapterViewController", sender:indexPath)
    }
}

extension ViewController {
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ChapterViewController" {
            let controller : ChapterViewController = segue.destination as! ChapterViewController
            let indexPath : IndexPath = sender as! IndexPath
            let row = self.datas![indexPath.row]
            controller.href = row[Expression<String>("href")]
            controller.title = row[Expression<String>("bookName")]
        }
    }
}
