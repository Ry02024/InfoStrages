name: Append Post to CSV

on:
  workflow_dispatch:
    inputs:
      content:
        description: 'Post content'
        required: true
      timestamp:
        description: 'Post timestamp'
        required: true

jobs:
  update_csv:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Append post to CSV
        run: |
          echo "${{ github.event.inputs.timestamp }},${{ github.event.inputs.content }}" >> data/posts.csv

      - name: Commit changes
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add data/posts.csv
          git commit -m "Add new post on ${{ github.event.inputs.timestamp }}"
          git push
