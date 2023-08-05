from graphviz import Digraph
import json
import networkx as nx
from IPython.display import display  # Import the display function

from data import *

data = json.loads(raw)  # load the data (converts the JSON string into a dictionary)


# this plot_graph function is used to turn the
def plot_graph(g):
    plot = Digraph("course_prereqs1", format='png')  # creates new directed graph object ;previous format was svg. Changed to png.
    for v in g.nodes:  # loops through every node in g (argument)
        plot.node(v, tooltip=data[v]["title"] if v in data else "")
    # print(g.edges())
    for u, v in g.edges():  # g.edges() returns a list of tuples
        plot.edge(u, v)
    # display(plot)
    # plot.render()
    plot.render('course_prereqs1', view=True)  # Save the graph to a file and open it


G = nx.DiGraph()  # creates new directed graph object

for code, vals in data.items():  # interates through they key-value pairs in the dictionary
    for vi in vals["first"]:
        G.add_edge(vi, code)

# code below allows me to see everything starting with CSC108 only.
# Select the subgraph with CSC108H1 and all its connected nodes
connected_nodes = list(nx.bfs_tree(G, source='CSC209H1'))
subgraph = G.subgraph(connected_nodes)
# Plot the subgraph

if __name__ == '__main__':
    # print(data)  # prints the raw data I have. (json.loads(raw))
    # plot_graph(G)

    # Plot the subgraph
    plot_graph(subgraph)  # if this was plot_graph(G), then would generate all courses.
