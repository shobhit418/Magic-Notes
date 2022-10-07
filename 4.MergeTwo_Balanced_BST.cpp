#include <bits/stdc++.h>
using namespace std;

struct node{
    
    int val;
    node*left,*right;
};
struct node* getNode(int data)
{
    struct node *getNode = new node;
    getNode->val = data;
    getNode->left = getNode->right = NULL;
    return getNode;
}

void inorder(node* root, vector<int>&v){
    if(root==nullptr)
    return;
    inorder(root->left,v);
    v.push_back(root->val);
    inorder(root->right,v);
}
void inorder(node* root){
    if(root==nullptr)
    return;
    inorder(root->left);
    cout<<root->val<<" ";
    inorder(root->right);
}
node* constructBST(vector<int>& nums,int start,int end){
        if(start>end)
            return NULL;
        int mid=(start+end)/2;
        int n=nums[mid];
        node* root;
        root=getNode(n);
        root->left=constructBST(nums,start,mid-1);
        root->right=constructBST(nums,mid+1,end);
        return root;
}
node* sortedArrayToBST(vector<int>& nums) {
        int n=nums.size();
        if(n==0)
            return NULL;
        return constructBST(nums,0,n-1);
        
}
int main(){
    
    /* Create following tree as first balanced BST
        100
        / \
        50 300
    / \
    20 70
    */
    node *root1 = getNode(100);
    root1->left     = getNode(50);
    root1->right = getNode(300);
    root1->left->left = getNode(20);
    root1->left->right = getNode(70);
 
    /* Create following tree as second balanced BST
            80
        / \
        40 120
    */
    node *root2 = getNode(80);
    root2->left     = getNode(40);
    root2->right = getNode(120);
    vector<int> arr1;
    vector<int>arr2;
    inorder(root1,arr1);
    inorder(root2,arr2);
    vector<int>ans=arr1;
    while(arr2.size()>0){
        ans.push_back(arr2.back());
        arr2.pop_back();
    }
    sort(ans.begin(),ans.end());
    node* root=sortedArrayToBST(ans);
    inorder(root);
    return 0;
}