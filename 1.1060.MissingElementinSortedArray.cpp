// 1060. Missing Element in Sorted Array
// Leve1
// Medium
// Descripton
// Given a srted array A of unique numbers, find the K-th missing number starting from the leftmost number of the array.
// Example 1:
// Input: A = [4,7,9,10], K = 1
// Output: 5
// Explanation:
// The first missing number is 5.
// Example 2:
// Input: A = [4,7,9,10], K = 3
// Output: 
// Explanation:
// The missing numbers are [5,6,8,…], hence the third missing number is 8.
// Example 3:
// Input: A = [1,2,4], K = 3
// Output: 6
// Explanation:
// The missing numbers are [3,5,6,7,…], hence the third missing number is 6.
// Note:
// 1 <= A.length <= 50000
// 1 <= A[i] <= 1e7
// 1 <= K <= 1e8

#include <bits/stdc++.h>
using namespace std;

int missingKthElement(vector<int>&arr,int k){
    //brueteforce TC = O(N)+O(K);
    unordered_set<int>st;
    for(int i:arr){
        st.insert(i);
    }
    int elm = arr[0];
    while(k!=0){
        if(st.find(elm)!=st.end()){
            elm++;
        }else{
            k--;
            elm++;
        }
    }
    return elm-1;
}


int main(){
    int n;
    cin>>n;
    vector<int>arr(n);
    for(int i =0;i<n;i++){
        cin>>arr[i];
    }
    int k;
    cin>>k;
    cout<<missingKthElement(arr,k)<<endl;
}