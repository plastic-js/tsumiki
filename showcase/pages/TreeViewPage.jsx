import TreeView, {
  TreeViewBranch,
  TreeViewBranchTrigger,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewItem,
} from '../../src/components/TreeView.jsx'

function TreeViewPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Navigation</p>
        <h1>Tree View</h1>
        <p className='hero-copy'>
          A hierarchical tree view for nested data like file explorers.
          Supports <span className='tag'>TreeViewBranch</span>
          <span className='tag'>TreeViewBranchTrigger</span>
          <span className='tag'>TreeViewItem</span> and
          <span className='tag'>TreeView.origin.Tree</span> for data modeling.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>File System Tree</p>
        <TreeView>
          <TreeViewBranch data-value="Documents">
            <TreeViewBranchControl>
              <TreeViewBranchTrigger />
              <TreeView.origin.BranchText>Documents</TreeView.origin.BranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewBranch data-value="Documents/Work">
                <TreeViewBranchControl>
                  <TreeViewBranchTrigger />
                  <TreeView.origin.BranchText>Work</TreeView.origin.BranchText>
                </TreeViewBranchControl>
                <TreeViewBranchContent>
                  <TreeViewBranch data-value="Documents/Work/Reports">
                    <TreeViewBranchControl>
                      <TreeViewBranchTrigger />
                      <TreeView.origin.BranchText>Reports</TreeView.origin.BranchText>
                    </TreeViewBranchControl>
                    <TreeViewBranchContent>
                      <TreeViewItem data-value="Documents/Work/Reports/Q1 Report.pdf">
                        <TreeView.origin.ItemText>Q1 Report.pdf</TreeView.origin.ItemText>
                      </TreeViewItem>
                      <TreeViewItem data-value="Documents/Work/Reports/Q2 Report.pdf">
                        <TreeView.origin.ItemText>Q2 Report.pdf</TreeView.origin.ItemText>
                      </TreeViewItem>
                    </TreeViewBranchContent>
                  </TreeViewBranch>
                  <TreeViewBranch data-value="Documents/Work/Invoices">
                    <TreeViewBranchControl>
                      <TreeViewBranchTrigger />
                      <TreeView.origin.BranchText>Invoices</TreeView.origin.BranchText>
                    </TreeViewBranchControl>
                    <TreeViewBranchContent>
                      <TreeViewItem data-value="Documents/Work/Invoices/INV-001.pdf">
                        <TreeView.origin.ItemText>INV-001.pdf</TreeView.origin.ItemText>
                      </TreeViewItem>
                      <TreeViewItem data-value="Documents/Work/Invoices/INV-002.pdf">
                        <TreeView.origin.ItemText>INV-002.pdf</TreeView.origin.ItemText>
                      </TreeViewItem>
                    </TreeViewBranchContent>
                  </TreeViewBranch>
                </TreeViewBranchContent>
              </TreeViewBranch>
              <TreeViewBranch data-value="Documents/Personal">
                <TreeViewBranchControl>
                  <TreeViewBranchTrigger />
                  <TreeView.origin.BranchText>Personal</TreeView.origin.BranchText>
                </TreeViewBranchControl>
                <TreeViewBranchContent>
                  <TreeViewBranch data-value="Documents/Personal/Photos">
                    <TreeViewBranchControl>
                      <TreeViewBranchTrigger />
                      <TreeView.origin.BranchText>Photos</TreeView.origin.BranchText>
                    </TreeViewBranchControl>
                    <TreeViewBranchContent>
                      <TreeViewItem data-value="Documents/Personal/Photos/vacation.jpg">
                        <TreeView.origin.ItemText>vacation.jpg</TreeView.origin.ItemText>
                      </TreeViewItem>
                      <TreeViewItem data-value="Documents/Personal/Photos/family.png">
                        <TreeView.origin.ItemText>family.png</TreeView.origin.ItemText>
                      </TreeViewItem>
                    </TreeViewBranchContent>
                  </TreeViewBranch>
                  <TreeViewItem data-value="Documents/Personal/Resume.pdf">
                    <TreeView.origin.ItemText>Resume.pdf</TreeView.origin.ItemText>
                  </TreeViewItem>
                </TreeViewBranchContent>
              </TreeViewBranch>
              <TreeViewItem data-value="Documents/README.md">
                <TreeView.origin.ItemText>README.md</TreeView.origin.ItemText>
              </TreeViewItem>
            </TreeViewBranchContent>
          </TreeViewBranch>
        </TreeView>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Navigation Menu Tree</p>
        <TreeView>
          <TreeViewBranch data-value="Settings">
            <TreeViewBranchControl>
              <TreeViewBranchTrigger />
              <TreeView.origin.BranchText>Settings</TreeView.origin.BranchText>
            </TreeViewBranchControl>
            <TreeViewBranchContent>
              <TreeViewItem data-value="Profile">
                <TreeView.origin.ItemText>Profile</TreeView.origin.ItemText>
              </TreeViewItem>
              <TreeViewItem data-value="Notifications">
                <TreeView.origin.ItemText>Notifications</TreeView.origin.ItemText>
              </TreeViewItem>
              <TreeViewItem data-value="Privacy">
                <TreeView.origin.ItemText>Privacy</TreeView.origin.ItemText>
              </TreeViewItem>
            </TreeViewBranchContent>
          </TreeViewBranch>
        </TreeView>
      </div>
    </div>
  )
}

export default TreeViewPage
